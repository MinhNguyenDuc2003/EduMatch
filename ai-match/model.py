from sentence_transformers import SentenceTransformer
import torch
from transformers import pipeline
import google.generativeai as genai

embedding_model = SentenceTransformer("BAAI/bge-m3")

"""llm_model = pipeline(
            "text-generation",
            model="microsoft/Phi-3-mini-4k-instruct",
            device_map="auto",             # GPU
            torch_dtype=torch.float16,     # FP16 = nhanh hơn
            max_new_tokens=1024
        )"""

genai.configure(api_key="AIzaSyAoCQKdgMY48hNoDgT8jiQRWY0Q0EnYhhE")  # Replace with your key
                
gemini_model = genai.GenerativeModel('gemini-2.5-flash')