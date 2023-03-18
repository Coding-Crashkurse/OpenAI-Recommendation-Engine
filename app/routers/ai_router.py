from fastapi import APIRouter, Depends
from app.crud.ai import get_ai_response
from app.users import current_active_user
from app.db import User

router = APIRouter(tags=["ai"])


@router.post("/ai", status_code=200)
async def create_ai_response(history: list[dict[str, str]], conversation: str, user: User = Depends(current_active_user)):
    return await get_ai_response(history, conversation, user=user)
