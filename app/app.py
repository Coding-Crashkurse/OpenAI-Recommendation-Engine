import os

from fastapi import Depends, FastAPI

from app.db import User, create_db_and_tables
from app.routers.ai_router import router as ai_router
from app.schemas import UserCreate, UserRead, UserUpdate
from app.users import auth_backend, current_active_user, fastapi_users

app = FastAPI()

app.include_router(fastapi_users.get_auth_router(auth_backend), tags=["auth"])
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    tags=["users"],
    prefix="/users",
)
app.include_router(ai_router)


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

#
# @app.on_event("shutdown")
# async def on_shutdown():
#     os.remove("test.db")
