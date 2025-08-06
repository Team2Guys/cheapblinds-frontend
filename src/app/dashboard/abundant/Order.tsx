'use client'
import { Modal, Table } from 'antd'
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb'
import DefaultLayout from 'components/Dashboard/DefaultLayout'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsEyeFill } from 'react-icons/bs'
import { Order as prodOrder } from 'types/prod'

const Order = ({ title, ordersData }: { title: string, ordersData: prodOrder[] }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState<prodOrder | null>(null);
   const [searchTerm, setSearchTerm] = useState<string>('');

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };
   const filteredOrders = ordersData.filter((order) => {
      const fullName = `${order.firstName} ${order.lastName}`.toLowerCase();
      return (
         fullName.includes(searchTerm.toLowerCase()) ||
         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );
   });
   const showModal = (record: prodOrder) => {
      setSelectedOrder(record);
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      setSelectedOrder(null);
   };

   const hasTransactionDate = ordersData?.some(item => item.transactionDate);

   const columns = [
      {
         title: "Order Id",
         dataIndex: "orderId",
         key: "orderId",
         width: 100,
      },
      {
         title: "Name",
         dataIndex: "firstName",
         key: "firstName",
         width: 200,
         render: (_: number, record: prodOrder) => `${record.firstName} ${record.lastName}`
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         width: 250,
      },
      {
         title: "Phone Number",
         dataIndex: "phone",
         key: "phone",
         width: 150,
      },
      {
         title: "Country",
         dataIndex: "country",
         key: "country",
         width: 200,
      },
      {
         title: "Emirate",
         dataIndex: "emirate",
         key: "emirate",
         width: 100,
      },
      {
         title: "Address",
         dataIndex: "address",
         key: "address",
         width: 120,
      },
      hasTransactionDate ? {
         title: "Transaction Date",
         dataIndex: "transactionDate",
         key: "transactionDate",
         width: 120,
         render: (date: string) => new Date(date).toLocaleString(),
      } : {
         title: "Checkout Date",
         dataIndex: "checkoutDate",
         key: "checkoutDate",
         width: 120,
         render: (date: string) => new Date(date).toLocaleString(),
      },
      {
         title: "View",
         dataIndex: "view",
         key: "view",
         width: 100,
         render: (_: unknown, record: prodOrder) => (
            <button onClick={() => showModal(record)} className="cursor-pointer">
           <BsEyeFill className="text-primary cursor-pointer text-base transition duration-300 ease-in-out hover:scale-200"/>
            </button>
         ),
      },
   ].filter(Boolean);


   return (
      <DefaultLayout>
         <Breadcrumb pageName={title} />
         <div className='mb-4'>
            <input
               className="primary-input w-fit"
               type="search"
               placeholder="Search Product"
               value={searchTerm}
               onChange={handleSearchChange}
            />
         </div>
         {ordersData && ordersData.length > 0 ? (
            <>
               <Table
                  className="xl:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
                  // dataSource={ordersData}
                  columns={columns}
                  dataSource={filteredOrders}
                  rowKey="id"
                  scroll={{ y: 550, x: "max-content" }}
                  pagination={false}
               />

               <Modal title="Order Details" open={isModalOpen} onCancel={handleCancel} footer={null}>
                  {selectedOrder && (
                     <div className='space-y-3 max-h-[75vh] overflow-y-auto'>
                        <p><strong>OrderId:</strong> {selectedOrder?.orderId}</p>
                        <p><strong>Name:</strong> {selectedOrder?.firstName} {selectedOrder?.lastName}</p>
                        <p><strong>Email:</strong> {selectedOrder?.email}</p>
                        <p><strong>Phone Number:</strong> {selectedOrder?.phone}</p>
                        <p><strong>Shipping Method:</strong> {selectedOrder?.shippingMethod?.name}</p>
                        <p><strong>Country:</strong> {selectedOrder?.country}</p>
                        <p><strong>Emirate:</strong> {selectedOrder?.emirate}</p>
                        <p><strong>City:</strong> {selectedOrder?.city}</p>
                        <p><strong>Address:</strong> {selectedOrder?.address}</p>
                        {selectedOrder?.note && (<p><strong>Other Notes:</strong> {selectedOrder?.note}</p>)}
                        <p className='flex items-center gap-1'><strong>Shippment Fee:</strong> {selectedOrder?.shipmentFee === 0 ? 'Free' : <span className='flex items-center'><Image src="/assets/images/price_sign/d.svg" width={14} height={14} alt='currency' />{selectedOrder?.shipmentFee}</span>}</p>
                        <p className='flex items-center gap-1'><strong>Total Amount:</strong> <span className='flex items-center'><Image src="/assets/images/price_sign/d.svg" width={14} height={14} alt='currency' />{selectedOrder?.totalPrice}</span></p>
                        {selectedOrder?.pay_methodType && <p className='capitalize'><strong>Payment Method:</strong> {selectedOrder?.pay_methodType}</p>}
                        {selectedOrder?.products.map((prod, index) => (
                           <div key={index} className='flex gap-2 justify-between items-center pe-3'>
                              <div className='flex gap-2'>
                                 <Image src={`${prod.image.imageUrl}`} alt={prod.name} width={50} height={50} className='object-contain' />
                                 <div className='space-y-1 xs:space-y-0'>
                                    <h3 className='font-medium text-xs xs:text-base'>{prod.name}</h3>
                                    {(prod.variant || prod.sizes) && (
                                       <div className='flex items-center gap-2 xs:gap-6'>
                                          {prod.variant && (
                                             <p className='font-medium text-xs xs:text-base'>
                                                Variant: <span className='font-normal capitalize'>{prod.variant}</span>
                                             </p>
                                          )}
                                          {prod.sizes && (
                                             <p className='font-medium text-xs xs:text-base'>
                                                Size: <span className='font-normal capitalize'>{prod.sizes}</span>
                                             </p>
                                          )}
                                       </div>
                                    )}
                                    {(prod.dimension && prod.dimension.length > 0) && (
                                       <p className="md:mt-1 text-xs xs:text-sm flex gap-1 items-center font-medium">
                                          Dimension: <span className="grid grid-cols-1">{prod.dimension.map((item: string, index: number) => <span key={index} className='font-normal'>{item}</span>)}</span>
                                       </p>
                                    )}

                                    <p className='font-medium text-xs xs:text-base'>Quantity: <span className='font-normal capitalize'>{prod.quantity}</span></p>
                                 </div>
                              </div>
                              <p className='font-medium flex items-center'><Image src="/assets/images/price_sign/d.svg" width={14} height={14} alt='currency' />{prod.totalPrice}</p>
                           </div>
                        ))}

                     </div>
                  )}
               </Modal>
            </>
         ) :
            <p className="text-primary dark:text-white">No Orders found</p>
         }
      </DefaultLayout>
   )
}

export default Order