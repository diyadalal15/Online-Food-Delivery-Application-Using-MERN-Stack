import React,{ useState } from 'react';

// import list of the countries from the external module 
import {countries} from 'countries-list';
import { useNavigate } from 'react-router-dom';
// import two hooks for connecting with redux 
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_DELIVERY_INFO } from '../../constants/cartConstant';
import { saveDeliveryInfo } from '../../actions/cartAction';
import CheckoutSteps from './CheckoutSteps';


const Delivery = () => {
// create an array of country data from the imported list 
const countriesList = Object.values(countries);
const navigate = useNavigate();
const { deliveryInfo } = useSelector((state) => state.cart);

const [address, setAddress] = useState(deliveryInfo.address);
const [city, setCity] = useState(deliveryInfo.city);
const [postalCode, setPostalCode] = useState(deliveryInfo.postalCode);
const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo);
const [country, setCountry] = useState(deliveryInfo.country);

const dispatch = useDispatch();

// define the function for handling the form submission 
const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryInfo({address,city,phoneNo,postalCode,country}));
    navigate('/confirm');
};

  return ( 
    <>
    <CheckoutSteps delivery />
    <div className='row wrapper'>
      <div className='col-10 col-lg-5 cart'>
        <form onSubmit={submitHandler}>
          <h1 className='mb-4'>Delivery Address</h1>
          {/* Input field for address  */}
          <div className='form-group'>
            <label htmlFor='address_field'>Address</label>
            <input
              type='text'
              id='address_field'
              className='form-control'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          {/* Input field for city  */}
          <div className='form-group'>
            <label htmlFor='city_field'>City</label>
            <input
              type='text'
              id='city_field'
              className='form-control'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          {/* Input for phone number  */}
          <div className='form-group'>
            <label htmlFor='phone_field'>Phone No</label>
            <input
              type='phone'
              id='phone_field'
              className='form-control'
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          {/* Input field for postal code  */}
          <div className='form-group'>
            <label htmlFor='postal_code_field'>Postal code</label>
            <input
              type='number'
              id='postal_code_field'
              className='form-control'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          {/* Input field for country  */}
          <div className='form-group'>
            <label htmlFor='country_field'>Country</label>
            <select 
              id='country_field'
              className='form-control'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              {
                countriesList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
                ))}
            </select>
          </div>
          {/* submit button  */}
          <button
            id='shipping_btn'
            type='submit'
            className='btn btn-block py-3'
          >
            Continue
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Delivery
