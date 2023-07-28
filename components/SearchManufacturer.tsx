"use client";

import { SearchManufacturerProps } from '@/types'
import React from 'react'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image';
import { useState, Fragment } from 'react';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({manufacturer, setManufacturer}: SearchManufacturerProps) => {
    const [query, setquery] = useState('')

    const filtredManufacturers = query === "" ? manufacturers : manufacturers.filter((item) => (
        item.toLocaleLowerCase().replace(/\s+/g, "").includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
    ))

  return (
    <div className='search-manufacturer'>
        <Combobox>
            <div className='relative w-full'>
            <Combobox.Button className="absolute top-[14px]">
                <Image
                src="/car-logo.svg"
                width={20}
                height={20}
                className="ml-4"
                alt="Car_logo"/>
            </Combobox.Button>

            <Combobox.Input 
                className="search-manufacturer__input"
                placeholder='Volkswagen'
                displayValue={(manufacturer:string) => manufacturer}
                onChange={(e) => setquery(e.target.value)}    />

                <Transition  as={Fragment} leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setquery('')}>
                   <Combobox.Options>
                        {
                            filtredManufacturers.map((item) => (
                                <Combobox.Option
                                key={item}
                                className={({active}) => `relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' :'text-gray-900'}`}
                                value={item}
                        >
                            {item}
                                </Combobox.Option>
                            ))
                        }
                   </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer