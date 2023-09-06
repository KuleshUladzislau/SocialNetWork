import  {RootState} from 'app/store/store'
import {createSelector} from "@reduxjs/toolkit";


export const selectFriendsPageSize = createSelector(
    (state: RootState) => state.myFriendsPage.pageSize,
    (pageSize) => pageSize
);


export const selectFriendsPage = createSelector(
    (state: RootState) => state.myFriendsPage.page,
    (page) => page
);

export const selectFriendsPageTotalCount = createSelector(
    (state: RootState) => state.myFriendsPage.totalCount,
    (page) => page
);


