import pandas as pd
import json
import re

df = pd.read_csv("countries_pl.csv", sep="\t")

def clean(name):
    name = name.strip()
    name = re.sub(r'\[\d+\]', '', name)
    return name.strip()

countries = []
for _, row in df.iterrows():
    name = clean(row['Państwo'])
    if name:
        countries.append({
            "name": name,
            "first": name[0].upper(),
            "last": name[-1].upper()
        })

with open("countries.json", "w", encoding="utf-8") as f:
    json.dump(countries, f, ensure_ascii=False, indent=2)

print(f"Generated {len(countries)} countries")
