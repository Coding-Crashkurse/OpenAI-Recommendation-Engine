from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.system import create_system, delete_system, get_system, update_system
from app.db import get_async_session
from app.schemas import SystemMessage

router = APIRouter(tags=["system"])


@router.post("/create_system", status_code=201)
async def c_system(
    message: SystemMessage, db: AsyncSession = Depends(get_async_session)
):
    return await create_system(db=db, message=message)


@router.get("/get_system", status_code=200)
async def g_system(db: AsyncSession = Depends(get_async_session)):
    return await get_system(db=db)


@router.put("/update_system", status_code=200)
async def u_system(
    message: SystemMessage, db: AsyncSession = Depends(get_async_session)
):
    return await update_system(db=db, message=message)


@router.delete("/delete_system", status_code=204)
async def d_system(db: AsyncSession = Depends(get_async_session)):
    return await delete_system(db=db)
