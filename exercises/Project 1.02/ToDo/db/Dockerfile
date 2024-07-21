# Use the official PostgreSQL image from the Docker Hub
FROM postgres:13

# Set the environment variables
ENV POSTGRES_USER=todo
ENV POSTGRES_PASSWORD=todo

# Add the initialization script to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/

# Ensure the script has the correct permissions
RUN chmod 755 /docker-entrypoint-initdb.d/init.sql

# Expose the PostgreSQL port
EXPOSE 5432
