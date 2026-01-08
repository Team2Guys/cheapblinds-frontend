import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      userId
      firstName
      lastName
      email
      phone
      country
      state
      city
      address
      totalAmount
      shippingCost
      notes
      items
      paymentStatus
      orderStatus
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrderById($id: ID!, $input: UpdateOrderByIdInput!) {
    updateOrderById(id: $id, input: $input) {
      id
      userId
      firstName
      lastName
      email
      phone
      state
      country
      city
      address
      totalAmount
      shippingCost
      notes
      items
      paymentStatus
      orderStatus
      lastEditedBy
    }
  }
`;

export const DELETE_ORDER_MUTATION = gql`
  mutation RemoveOrderById($id: ID!) {
    removeOrderById(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;
