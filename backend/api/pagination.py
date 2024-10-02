from ninja.pagination import PageNumberPagination
from ninja import Field, Schema
from typing import Any, Optional

class MyPagination(PageNumberPagination):
    class Input(Schema):
        page: int = Field(1, ge=1)

    class Output(Schema):
        count: int
        current_page: int
        total_pages: int
        previous: Optional[int]
        next: Optional[int]
        hasMore: bool

    def additional_info(self, page, queryset):
        offset = (page - 1) * self.page_size
        count = self._items_count(queryset)
        next, prev = None, None
        if page > 1:
            prev = page - 1
        if offset + self.page_size < count:
            next = page + 1
        return {
            "current_page": page,
            "total_pages": (count + self.page_size - 1) // self.page_size,
            "next": next,
            "previous": prev,
            "hasMore": bool(next),
        }

    def paginate_queryset(self, queryset, pagination: Input, **params) -> Any:

        resp = super().paginate_queryset(queryset=queryset, pagination=pagination, **params)
        resp.update(self.additional_info(pagination.page, queryset))
        
        return resp

    def apaginate_queryset(self, queryset, pagination: Input, request, **params) -> Any:

        resp = super().paginate_queryset(queryset=queryset, pagination=pagination, **params)
        resp.update(self.additional_info(pagination.page, queryset))

        return resp