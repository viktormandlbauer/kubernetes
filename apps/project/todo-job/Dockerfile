# Use a minimal base image with Python
FROM python:3.9-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install the Python dependencies
RUN pip install --no-cache-dir requests

# Copy the Python script into the container
COPY add-todo.py .

# Run the Python script
CMD ["python", "add-todo.py"]
