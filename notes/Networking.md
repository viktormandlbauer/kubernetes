# Networking

## Services

### NodePort

The nodePort service forwards the port of the node to the target port of the pod. 

```yaml
apiVersion: v1
kind: Service
metadata:
  name: <service-name>
spec:
  type: NodePort
  selector:
    app: simple-html
  ports:
    - name: http
      protocol: TCP
      port: <pod-node
      # targetPort: <port> default ist 'port'
      nodePort: <node-port>
```

In the k3d setup, the host port can be fordwared to the node ports when creating the cluster

```bash
k3d cluster create -p 30000:30000@agent:0 -p 30001:30000@agent:1 -p 80:80@loadbalancer --agents 2
```

The ports of the node can be forwarded to the pod

```bash
# 
kubectl port-forward pods/simple-html-6c85448ff6-6tj8x 5000:3000
```

[port-forward-access-application-cluster](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/)

## Middleware

### Traefik

```yaml
---
# Middleware configuration for removing path prefixes
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: <middleware-name>
spec:
  stripPrefix:
    prefixes:
      - /<strip-prefix1>
      - ...
---
# Ingress with middleware annotation
apiVersion: traefik.io/v1alpha1
kind: Ingress
metadata:
  name: <ingress-name>
  annotations:
    traefik.ingress.kubernetes.io/router.middlewares: '<namespace-name>-<middlewar-name>@kubernetescrd'
spec:
  rules:
  - http
      paths:
      ...
```

https://doc.traefik.io/traefik/middlewares/http/stripprefix/#configuration-exampless