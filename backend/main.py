import json
from datetime import date
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

COUNTRIES = json.loads(Path("countries.json").read_text(encoding="utf-8"))
COUNTRIES_BY_NAME = {c["name"].upper(): c for c in COUNTRIES}

# Letters that are part of the main SCC — every pair is mutually reachable
SCC_LETTERS = ["A", "E", "G", "I", "J", "K", "L", "M", "N", "O", "R", "S", "T", "U"]


def daily_letters(date_str: str) -> tuple[str, str]:
    d = int(date_str.replace("-", ""))
    start = SCC_LETTERS[d % len(SCC_LETTERS)]
    end_idx = (d * 31 + 7) % len(SCC_LETTERS)
    if SCC_LETTERS[end_idx] == start:
        end_idx = (end_idx + 1) % len(SCC_LETTERS)
    return start, SCC_LETTERS[end_idx]


@app.get("/challenge")
def challenge():
    today = date.today().isoformat()
    start, end = daily_letters(today)
    return {"date": today, "start": start, "end": end}


@app.get("/countries")
def countries():
    return COUNTRIES


class ValidateRequest(BaseModel):
    name: str
    current_letter: str


@app.post("/validate")
def validate(req: ValidateRequest):
    name = req.name.strip()
    key = name.upper()
    country = COUNTRIES_BY_NAME.get(key)
    if country is None:
        return {"valid": False, "error": f"Nieznany kraj: {name}"}
    if country["first"] != req.current_letter.upper():
        return {
            "valid": False,
            "error": f"Kraj musi zaczynać się na '{req.current_letter}'",
        }
    return {
        "valid": True,
        "name": country["name"],
        "next_letter": country["last"],
        "is_win": False,  # caller checks against end letter
    }
