# Debugging

## General

```sh
kubectl describe

kubectl logs
```

## Cluster

```sh
kubectl cluster-info

kubectl cluster-info dump
```

## Nodes

```sh
# Get nodes
kubectl get nodes -o wide

# Node information
kubectl describe nodes <nodename>
```

## Pods

```sh
# Show pods
kubectl get pods -o wide

# Show pod logs 
kubectl logs pods/<pod-name>
```

## Network

```sh
# Show services
kubectl get service -o wide
```

The `busybox` image can be used for testing network connectivity between pods.

```yaml
# Creates a pod with the busybox images
apiVersion: v1
kind: Pod
metadata:
  name: my-busybox
  labels:
    app: my-busybox
spec:
  containers:
  - image: busybox
    command:
      - sleep
      - "3600"
    imagePullPolicy: IfNotPresent
    name: busybox
  restartPolicy: Always
```

```sh
# Test TCP connection
kubectl exec -it my-busybox -- nc -v <svc-name/svc-ip> <port> 

# Test HTTP response
kubectl exec -it my-busybox -- wget -qO - http://<svc-name>:<port>
```
