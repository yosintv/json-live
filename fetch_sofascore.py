import requests
import json
from datetime import datetime

# Get today's date in YYYY-MM-DD format
today = datetime.utcnow().strftime('%Y-%m-%d')
url = f"https://www.sofascore.com/api/v1/sport/football/scheduled-events/{today}"

# Fetch data
response = requests.get(url)
if response.status_code != 200:
    raise Exception(f"API request failed: {response.status_code}")

data = response.json()

# Save to file
with open('data/scheduled-events.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"Updated data for {today}")
