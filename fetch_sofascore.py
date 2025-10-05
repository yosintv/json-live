import requests
import json
from datetime import datetime
import time

today = datetime.utcnow().strftime('%Y-%m-%d')
url = f"https://www.sofascore.com/api/v1/sport/football/scheduled-events/{today}"
headers = {'User-Agent': 'Mozilla/5.0 (compatible; YourApp/1.0)'}

for attempt in range(3):
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        break
    except requests.RequestException as e:
        print(f"Attempt {attempt+1} failed: {e}")
        if attempt == 2:
            raise Exception(f"API request failed after 3 attempts: {e}")
        time.sleep(2)

data = response.json()

with open('data/scheduled-events.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"Updated data for {today}")
