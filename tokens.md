# Gitlab Agent Registration Token

Token: fyD1rwqnt2LWXi6QTnG8bfxxc6FUchzx3MB5wPsWJtFZ48iNpw

Docker command:

```
docker run --pull=always --rm \
registry.gitlab.com/gitlab-org/cluster-integration/gitlab-agent/cli:v14.8.1 generate \
--agent-token=fyD1rwqnt2LWXi6QTnG8bfxxc6FUchzx3MB5wPsWJtFZ48iNpw \
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
rancher kubectl create namespace sniffer-staging

rancher kubectl create secret docker-registry regcred --namespace=sniffer-staging --docker-server=registry.socs.uoguelph.ca --docker-username=snifferagent --docker-password=tXnxhC3Y7JA-e6xPnbpH --docker-email=hnadee03@uoguelph.ca
