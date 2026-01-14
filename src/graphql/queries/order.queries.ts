import { gql } from "@apollo/client";

export const ORDER_LIST_QUERY = gql`
  query OrderList {
    orderList {
      id
      userId
      shippingAddress
      billingAddress
      totalAmount
      shippingCost
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;

export const ORDER_BY_ID = gql`
  query OrderById($id: ID!) {
    orderById(id: $id) {
      id
      userId
      shippingAddress
      billingAddress
      totalAmount
      shippingCost
      notes
      orderItems
      lastEditedBy
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;

export const ORDERS_BY_USER_ID = gql`
  query OrdersByUserId($id: ID!) {
    orderListByUserId(id: $id) {
      id
      userId
      shippingAddress
      billingAddress
      totalAmount
      shippingCost
      notes
      orderItems
      lastEditedBy
      paymentStatus
      orderStatus
      createdAt
      updatedAt
    }
  }
`;
