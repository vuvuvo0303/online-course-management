import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Course } from "../models";

type CartState = {
    courseList: Course[],
    totalQuantity: number,
    totalPrice: number,
    showCart: boolean,
}

const initialState: CartState = {
    courseList: [],
    totalQuantity: 0,
    totalPrice: 0,
    showCart: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Course>){
            const newCourse = action.payload;
            const existingCourse = state.courseList.find(course => course.courseId === newCourse.courseId);
            if(!existingCourse){
                state.courseList.push(newCourse);
            }
            state.totalQuantity++ ;
            state.totalPrice += newCourse.price;
        },

        removeFromCart(state, action: PayloadAction<{courseId: string}>){
            const courseId = action.payload.courseId;
            const removeCourse = state.courseList.find(course => course.courseId === courseId);
            if(removeCourse){
                state.courseList = state.courseList.filter(course => course.courseId !== courseId);
                state.totalQuantity--;
                state.totalPrice -= removeCourse.price;
            }
        },

        showCart(state){
            state.showCart = !state.showCart
        }
    }
})

export const {addToCart, removeFromCart, showCart} = cartSlice.actions;

export default cartSlice.reducer;