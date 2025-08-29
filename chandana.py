from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import os

# Optional: IBM Watson SDK
# from ibm_watson import NaturalLanguageUnderstandingV1
# from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

app = FastAPI()

# CORS middleware for frontend-backend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class SymptomInput(BaseModel):
    symptoms: str

# Load a simple HF pipeline model
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

@app.post("/predict")
def predict(input: SymptomInput):
    symptoms = input.symptoms
    result = classifier(symptoms)
    
    # Mock prescription logic (extend with real DB or model)
    if "fever" in symptoms.lower():
        prescription = "Take paracetamol 500mg twice daily"
    else:
        prescription = "Consult your physician for detailed analysis"

    return {
        "classification": result,
        "prescription": prescription
    }
