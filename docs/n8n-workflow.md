# IIT JAM Physics Question Extraction Pipeline Setup

This guide provides step-by-step instructions to set up an automated pipeline in n8n to extract IIT JAM Physics questions from PDF images and save them directly to the Jamphy database.

## Prerequisites
1. An **n8n** account (cloud or self-hosted).
2. A **Google Drive** connection configured in n8n.
3. A **Gemini API Key** from Google AI Studio.
4. Your Jamphy API Key: `j4mphy_super_s3cure_ext1act_api_k3y_9922`.

---

## Google Drive Folder Preparation
1. Open your Google Drive.
2. Create a folder named `jamphy-uploads`. This is where you will drop new question sheets/images.
3. Create another folder named `jamphy-processed`. Processed files will automatically move here.
4. Note down the folder IDs from the URL bar (e.g., in `drive.google.com/drive/folders/FOLDER_ID`, copy `FOLDER_ID`).

---

## Step-by-Step n8n Workflow Configuration

### Node 1: Google Drive Trigger (Watch Folder)
* **Purpose**: Triggers whenever a new PDF or image file is uploaded.
* **Configuration**:
  1. Click **Add First Step** and select **Google Drive Trigger**.
  2. **Event**: `File Created or Updated`.
  3. **Filters**: 
     * **Folder**: Select or paste your `jamphy-uploads` folder ID.
     * **Only Trigger For**: `Files`.
  4. Save and test this step by uploading a sample image to your Drive folder.

### Node 2: Google Drive Download (Fetch Binary)
* **Purpose**: Downloads the file binary to process it.
* **Configuration**:
  1. Add a **Google Drive** node next.
  2. **Action**: `Download a File`.
  3. **File ID**: Click the expression toggle (cloud icon) and paste: `{{ $json.id }}`.
  4. The output will contain the downloaded file as a binary object named `data`.

### Node 3: Convert to Base64 (Code Node)
* **Purpose**: Converts the binary file content into a Base64 string for the Gemini API payload.
* **Configuration**:
  1. Add a **Code** node.
  2. **Language**: `JavaScript`.
  3. Replace the code block with:
     ```javascript
     const binaryData = items[0].binary.data;
     const base64Data = binaryData.data; // n8n stores base64 string directly in data
     const mimeType = binaryData.mimeType;

     return [{
       json: {
         base64Data,
         mimeType,
         fileName: items[0].json.name
       }
     }];
     ```

### Node 4: HTTP Request to Gemini (Extract JSON)
* **Purpose**: Sends the Base64 image to Gemini 2.0 Flash to extract standard questions.
* **Configuration**:
  1. Add an **HTTP Request** node.
  2. **Method**: `POST`.
  3. **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_GEMINI_API_KEY` (Replace with your actual key).
  4. **Headers**: Add `Content-Type`: `application/json`.
  5. **Body Parameters**: Select type `JSON` and paste the following payload:
     ```json
     {
       "contents": [
         {
           "parts": [
             {
               "inlineData": {
                 "mimeType": "{{ $json.mimeType }}",
                 "data": "{{ $json.base64Data }}"
               }
             },
             {
               "text": "You are an IIT JAM Physics question extractor. Extract ALL questions from this image. Return ONLY a valid JSON array with no markdown formatting. Each object must have: year (string, 4 digits), subject (one of: Mathematical Methods, Mechanics and General Properties, Oscillations Waves and Optics, Electricity and Magnetism, Kinetic Theory and Thermodynamics, Modern Physics, Solid State Physics and Electronics), type (MCQ/MSQ/NAT), question (preserve all LaTeX using \\( \\) and \\[ \\] delimiters), options (array of 4 strings or null for NAT), correctAnswer (integer 0-3 or null), correctAnswers (integer array or null), natAnswer (string or null), hasImage (boolean), solution (brief step-by-step solution string)."
             }
           ]
         }
       ]
     }
     ```

### Node 5: Code Node to Parse Output
* **Purpose**: Cleans Gemini's response text and parses it into a valid JavaScript array.
* **Configuration**:
  1. Add a **Code** node.
  2. **Language**: `JavaScript`.
  3. Replace the code block with:
     ```javascript
     const rawText = items[0].json.candidates[0].content.parts[0].text;
     
     // Remove markdown JSON codeblock markers if present
     const cleanJsonText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
     
     try {
       const parsed = JSON.parse(cleanJsonText);
       const questionsArray = Array.isArray(parsed) ? parsed : [parsed];
       
       return questionsArray.map(q => ({ json: q }));
     } catch (err) {
       throw new Error("Failed to parse Gemini output into JSON: " + err.message + ". Raw text: " + rawText);
     }
     ```

### Node 6: Split In Batches
* **Purpose**: Loops through each extracted question individually.
* **Configuration**:
  1. Add a **Split In Batches** node.
  2. Set **Batch Size** to `1`.
  3. Connect the output to Node 7.

### Node 7: HTTP Request to Jamphy (Submit Question)
* **Purpose**: Submits the formatted question to the Jamphy API.
* **Configuration**:
  1. Add an **HTTP Request** node.
  2. **Method**: `POST`.
  3. **URL**: `https://jamphy.com/api/admin/questions` (or your local environment URL).
  4. **Authentication / Headers**:
     * Add `Content-Type`: `application/json`
     * Add `x-api-key`: `j4mphy_super_s3cure_ext1act_api_k3y_9922`
  5. **Send Body**: `true`.
  6. **Body**: Select `JSON` and paste the exact mapped fields:
     ```json
     {
       "question": "{{ $json.question }}",
       "subject": "{{ $json.subject }}",
       "type": "{{ $json.type }}",
       "year": "{{ $json.year }}",
       "options": {{ JSON.stringify($json.options) }},
       "correctAnswer": {{ $json.correctAnswer }},
       "correctAnswers": {{ JSON.stringify($json.correctAnswers) }},
       "natAnswer": "{{ $json.natAnswer }}",
       "hasImage": {{ $json.hasImage }},
       "solution": "{{ $json.solution }}"
     }
     ```
  7. Loop back to the **Split In Batches** node input to process the next item.

### Node 8: Google Drive Move (Post-Processing)
* **Purpose**: Moves the processed file to `jamphy-processed` to avoid double processing.
* **Configuration**:
  1. Connect this node to the **Done** branch of the **Split In Batches** node.
  2. Select **Google Drive** node.
  3. **Action**: `Update/Move File`.
  4. **File ID**: `{{ $node[\"Google Drive Trigger\"].json[\"id\"] }}`.
  5. **Folder**: Select or paste your `jamphy-processed` folder ID.

### Node 9: Error Handler
* **Purpose**: Sends alert notifications if the extraction or API insert fails.
* **Configuration**:
  1. Drag an **Error Trigger** node into the workflow (activates when any node errors out).
  2. Connect to an **Email** or **Slack Webhook** node.
  3. Include details: `"Error occurred processing file {{ $json.execution.error.message }}. Run URL: {{ $json.execution.url }}"`.
