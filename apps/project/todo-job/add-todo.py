import requests, os

url = os.environ.get('TODO_API_URL', 'http://host.docker.internal/todos')
random_wikipedia_url = os.environ.get('RANDOM_WIKIPEDIA_URL', 'https://en.wikipedia.org/wiki/Special:Random')

print("Fetching random Wikipedia URL...")

response = requests.get(random_wikipedia_url, allow_redirects=False)
location = response.headers['Location']

print(f"Random Wikipedia URL: {location}")

data = {
    'title': f'Read {location}',
    'status': 'open'
}

print(f"Adding todo: {data} to {url}")

response = requests.post(url, json=data)

# Check response    
print(response.json())