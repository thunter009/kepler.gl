FROM hashicorp/terraform:0.12.28
LABEL maintainer="Maksym Postument, mpost@7parkdata.com"

ENV TF_VAR_CI_COMMIT_ID $CI_COMMIT_ID

COPY terraform /terraform
WORKDIR /terraform/Prod/Kepler-Gl