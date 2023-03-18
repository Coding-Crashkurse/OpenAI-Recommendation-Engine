import os

import openai
from dotenv import load_dotenv
from app.db import User

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
context = [{"role": "system", "content": "Du bist ein hilfreicher Assistent für meine Website"}]

async def get_ai_response(history: list[dict[str, str]], message: str, user: User):
    # messages = [{"role": "user", "content": "Hallo user"}, {"role": "assistant", "content": "You are a beginner as I can see. Maybe you want to learn Python?"} ]
    context.extend(history.copy())
    context.append({"role": "user", "content": message})
    print(user.__dict__)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=context,
    )
    return response
