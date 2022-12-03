from typing import Union
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware


from complier import ComplieCode
from models import CodeFile



app = FastAPI()

#To test localhost
origins = [
    "http://127.0.0.1:8000",
    "http://127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/execute")
async def excute(code : CodeFile):
    compile = ComplieCode(code)
    return await compile.compile()

