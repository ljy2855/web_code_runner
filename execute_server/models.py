from pydantic import BaseModel


class CodeFile(BaseModel):
    code: str
    lang: str
    input_buff: str
