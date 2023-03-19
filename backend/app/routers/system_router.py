import os

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.system import create_system, delete_system, get_system, update_system
from app.db import User, get_async_session
from app.schemas import SystemMessage
from app.users import current_active_user

router = APIRouter(tags=["system"])


async def is_admin(user: User = Depends(current_active_user)):
    if not user.email == os.environ.get("ADMIN_EMAIL"):
        raise HTTPException(
            status_code=403, detail="Only the System Admin can use this route"
        )
    return user


@router.post("/create_system", status_code=201, dependencies=[Depends(is_admin)])
async def c_system(
    message: SystemMessage,
    db: AsyncSession = Depends(get_async_session),
):
    return await create_system(db=db, message=message)


@router.get("/get_system", status_code=200, dependencies=[Depends(is_admin)])
async def g_system(
    db: AsyncSession = Depends(get_async_session),
):
    return await get_system(db=db)


@router.put("/update_system", status_code=200, dependencies=[Depends(is_admin)])
async def u_system(
    message: SystemMessage,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(is_admin),
):
    return await update_system(db=db, message=message)


@router.delete("/delete_system", status_code=204, dependencies=[Depends(is_admin)])
async def d_system(
    db: AsyncSession = Depends(get_async_session),
):
    return await delete_system(db=db)
