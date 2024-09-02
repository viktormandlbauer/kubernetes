# Storage

## Persistent Volumes

Using node filesystem for persistent storage:

```bash
# Replace <node-name> with the name of your Kubernetes node
docker exec <node-name> mkdir -p /tmp/project
docker exec <node-name> mkdir -p /tmp/experimental
```

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: <pv-name>
spec:
  storageClassName: <storageclass-name> # Referenced by pvc 
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  local:
    path: <local-filesystem-path>
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - <node-name1>
          - <node-name2>
```

### Persistent Volumes Claim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim 
metadata:
  name: <pvc-name>
spec:
  storageClassName: <storageclass-name-reference>
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Use it in deployments like

```yaml
# ...
    spec:
      volumes:
        - name: <volume-name>
          persistentVolumeClaim:
            claimName: <pvc-name>
      containers:
        - name: <container-name>
          image: <image-name>:<image-tag>
          volumeMounts:
          - name: <volume-name>
            mountPath: /usr/src/app/files
        - name: <container-name>
          image: <image-name>:<image-tag>
          volumeMounts:
          - name: <volume-name>
            mountPath: /usr/src/app/files
```

## StatefulSets

```bash
kubectl run -it --rm --restart=Never --image postgres psql-for-debugging sh
```