# update_cricket_json.py
import urllib.request
import json
import os

URL = "https://www.sofascore.com/api/v1/sport/cricket/events/live"
OUTPUT_FILE = "cricket_live_events.json"

def fetch_and_update():
    try:
        # Add User-Agent header to avoid potential API restrictions
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        req = urllib.request.Request(URL, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = response.read().decode('utf-8')
            json_data = json.loads(data)
            
            # Write JSON data to file
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, ensure_ascii=False, indent=4)
            
            print(f"Updated {OUTPUT_FILE} successfully at {time.ctime()}")
    except Exception as e:
        print(f"Error updating file: {str(e)}")

if __name__ == "__main__":
    fetch_and_update()
