import os
from rembg import remove
from PIL import Image

input_path = r"c:\Users\saake\.gemini\antigravity-ide\brain\1ddedd3f-6ccf-46b8-9ccc-317e6dbc0b2c\.user_uploaded\media_1790325458666.jpg"
output_path = r"c:\Users\saake\Downloads\portfolio\public\hero_portrait_transparent.png"

try:
    input_image = Image.open(input_path)
    # The image might be large, resizing it slightly for performance and web optimization
    input_image.thumbnail((1200, 1200))
    output_image = remove(input_image)
    output_image.save(output_path)
    print("Background removed successfully!")
except Exception as e:
    print(f"Error: {e}")
