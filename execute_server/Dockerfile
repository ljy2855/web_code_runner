FROM python:3.9.13

WORKDIR /Workspace

COPY ./requirements.txt /Workspace/

RUN pip install --no-cache-dir --upgrade -r /Workspace/requirements.txt

COPY . /Workspace/

EXPOSE 8000

ENTRYPOINT ["uvicorn" , "main:app" , "--host", "0.0.0.0"]

