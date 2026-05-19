# pyrefly: ignore [missing-import]
import fitz # PyMuPDF
import sys
import os

def demo_extract(pdf_path):
    print(f"Opening PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    
    print("\n--- EXTRACTING TEXT FROM PAGE 1 ---")
    # Usually the first page is instructions, let's grab page 2 or 3 (index 1 or 2)
    page = doc[2] if len(doc) > 2 else doc[0]
    text = page.get_text()
    
    print(text[:800])
    print("\n[... truncated ...]\n")
    
    print("\n--- AUTOMATIC IMAGE EXTRACTION ---")
    image_count = 0
    # Search first few pages for images/graphs
    for page_index in range(min(10, len(doc))):
        page = doc[page_index]
        image_list = page.get_images(full=True)
        
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Save the first image we find
            image_filename = f"extracted_graph_{image_count}.{image_ext}"
            image_path = os.path.join(os.path.dirname(__file__), image_filename)
            
            with open(image_path, "wb") as f:
                f.write(image_bytes)
                
            print(f"Found and automatically saved image from PDF: {image_filename}")
            image_count += 1
            
            if image_count >= 2: # Just demo 2 images
                break
        if image_count >= 2:
            break
            
    if image_count == 0:
        print("No images found in the first 10 pages.")

if __name__ == "__main__":
    demo_extract("/Users/shreyansh/Downloads/PH2020.pdf")
