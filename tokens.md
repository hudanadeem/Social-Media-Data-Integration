# Gitlab Agent Registration Token

Token: {token-name}

Docker command:

```
docker run --pull=always --rm \
registry.gitlab.com/gitlab-org/cluster-integration/gitlab-agent/cli:v14.8.1 generate \
--agent-token={token-name} \
--kas-address=wss://gitlab.socs.uoguelph.ca/-/kubernetes-agent/ \
--agent-version v14.8.1 \
--namespace gitlab-agent | rancher kubectl apply -f -
```

# Gitlab Registry Deploy Token

## Change docker-username, docker-password, docker-email, namespace

username: snifferagent
token: tXnxhC3Y7JA-e6xPnbpH
namespace: sniffer
dockeremail: hnadee03@uoguelph.ca

rancher context switch
rancher kubectl create namespace sniffer

rancher kubectl create secret docker-registry regcred --namespace=sniffer --docker-server=registry.socs.uoguelph.ca --docker-username=snifferagent --docker-password=tXnxhC3Y7JA-e6xPnbpH --docker-email=hnadee03@uoguelph.ca
