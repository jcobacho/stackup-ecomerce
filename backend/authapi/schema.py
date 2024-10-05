# from ninja_jwt.schema import TokenObtainPairInputSchema
from typing import Type, Dict
from ninja_jwt.tokens import RefreshToken
from ninja_jwt.schema import TokenObtainInputSchemaBase
# from ninja_jwt.controller import TokenObtainPairController
# from ninja_extra import api_controller, route
from ninja import Schema

class UserSchema(Schema):
    first_name: str
    email: str
    username: str


class MyTokenObtainPairOutSchema(Schema):
    refresh: str
    access: str
    user: UserSchema


class MyTokenObtainPairInputSchema(TokenObtainInputSchemaBase):
    @classmethod
    def get_response_schema(cls) -> Type[Schema]:
        return MyTokenObtainPairOutSchema

    @classmethod
    def get_token(cls, user) -> Dict:
        values = {}
        refresh = RefreshToken.for_user(user)
        values["refresh"] = str(refresh)
        values["access"] = str(refresh.access_token)
        values.update(user=UserSchema.from_orm(user)) # this will be needed when creating output schema
        return values
