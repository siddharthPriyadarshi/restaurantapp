import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'

import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import EmptyCart from '../img/emptyCart.svg'
import CartItem from './CartItem'

const CartContainer = () => {
  const [{ cartShow, cartItem, user }, dispatch] = useStateValue()
  const [tot, setTot] = useState(0)
  const [flag, setFlag] = useState(1)

  const hideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    })
  }

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItem: [],
    })

    localStorage.setItem('cartItems', JSON.stringify([]))
  }

  useEffect(() => {
    let totalPrice = cartItem.reduce((accumulator, item) => {
      return accumulator + item.price * item.qty
    }, 0)

    setTot(totalPrice)
  }, [tot, flag])
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 ">
        <motion.div whileTap={{ scale: 0.75 }} onClick={hideCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-xl cursor-pointer" />
        </motion.div>

        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear
          <RiRefreshFill />{' '}
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItem && cartItem.length > 0 ? (
        <div className=" w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div
            className="w-full h-340 md:h-43 py-10 px-6 flex flex-col gap-3 overflow-y-scroll scrollbar-none
        "
          >
            {/* Cart Item */}
            {/* cartItem*/}
            {cartItem.map((cartItem) => (
              <CartItem
                item={cartItem}
                key={cartItem.id}
                setFlag={setFlag}
                flag={false}
              />
            ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">₹ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">₹ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-cetner justify-between">
              <p className="text-gray-200 text-xl font-semibold"> Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                {' '}
                ₹ {Number.parseFloat(tot + 2.5)}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
            >
              {user ? 'Checkout' : 'Login to Checkout'}
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="empty cart" className="w-300 " />
          <p className="text-xl text-textColor font-semibold">
            Add item to your cart
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default CartContainer
