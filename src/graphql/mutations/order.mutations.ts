import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      userId
      shippingAddress
      billingAddress
      totalAmount
      shippingCost
      notes
      orderItems
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
      shippingAddress
      billingAddress
      totalAmount
      shippingCost
      notes
      orderItems
      paymentStatus
      orderStatus
      lastEditedBy
      updatedAt
    }
  }
`;

export const DELETE_ORDER_MUTATION = gql`
  mutation RemoveOrderById($id: ID!) {
    removeOrderById(id: $id) {
      id
      userId
    }
  }
`;
