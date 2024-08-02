# Networking

## Port Forwarding

```bash
# 
kubectl port-forward pods/simple-html-6c85448ff6-6tj8x 5000:3000
```

## NodePort

As the nodes aren't reachable through the externalIP,</br>
I've forwarded the host system ports to the nodePorts:</br>
127.0.0.1:30000 -> nodePort@agent:0</br>
127.0.0.1:30001 -> nodePort@agent:1

```bash
k3d cluster create -p 30000:30000@agent:0 -p 30001:30000@agent:1 -p 80:80@loadbalancer --agents 2
```

The service is configured with type "NodePort", which let's

```yaml
apiVersion: v1
kind: Service
metadata:
  name: simple-html-svc
spec:
  type: NodePort
  selector:
    app: simple-html
  ports:
    - name: http
      protocol: TCP
      port: 3000
      targetPort: 3000
      nodePort: 30000
```

## Middleware

```

```

https://doc.traefik.io/traefik/middlewares/http/stripprefix/#configuration-examples