# Microservices

## When To Use Microservices

Focus on outcomes rather than technology. The default approach should be the simplest one. Service architecture can be incrementally added to a monolithic architecture.

### Pros

- **Zero-downtime independent deployability**: Deploy changes to individual services without affecting the entire system.
- **Isolation of data and processing**: Each service manages its own data and logic, enhancing security and reliability.
- **Limit the "blast radius" of failure**: Contain the impact of failures within a single service, preventing widespread disruption.
- **Reflect organizational structure**: Align services with teams, allowing for more efficient and focused development.
- **Scalability**: Scale individual services independently to meet demand.

### Cons

- **Increased complexity**: Managing multiple services requires more coordination and oversight.
- **Dependency management**: Handling dependencies between services can become challenging.

## How to Avoid a Distributed Monolith

- **Create a robust deployment mechanism**: Ensure smooth, reliable deployment processes for multiple services.
- **Identify and address patterns**: Recognize common issues and develop strategies to manage them effectively.

## Why Strive for Independent Deployment

- **Minimize impact of releases**: Limit the scope of changes and reduce the risk of widespread issues.
- **Simplify coordination with larger teams**: As team sizes grow, coordinating deployments becomes increasingly difficult.

## Handling Data

- **Understand data complexity**: Breaking down complex systems often involves intricate data management.
- **Map old databases to new services**: Identify and segregate data used by each microservice from the original database.

## Kubernetes

### [Cluster Management](notes/ClusterManagement.md)

### [Deployment](notes/Deployment.md)

### [Service](notes/Service.md)

### [Networking](notes/Networking.md)

### [Debugging](notes/Debugging.md)


## Exercises

### [Project v0.1](exercises/Project%20v0.1/)

### [Project v0.2](exercises/Project%20v0.2/)

### [Project v0.3](exercises/Project%20v0.3/)

### [Project v0.4](exercises/Project%20v0.4/)

---

## Sources

- <https://kubernetes.io/de/docs/reference/>
- <https://devopswithkubernetes.com/>