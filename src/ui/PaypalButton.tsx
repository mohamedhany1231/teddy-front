import { useMutation, useApolloClient } from "@apollo/client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import confirmOrder from "../graphQl/order/confirmOrder";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const clientId =
  "AXvUM9Fsw74uk1Ohyua7SJuZ9x-nSgSX3DmY2ZgwJY8qiA4RNRms0TAwwTiak-cXzI6TDHF6WynpoDyS";
export default function PaypalButton({ price }: { price: string }) {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const client = useApolloClient();
  const [confirm] = useMutation(confirmOrder, {
    onCompleted: () => {
      client.refetchQueries({ include: ["MyOrders"] });
    },
  });

  function successCallback() {
    toast.success("purchase success ", {
      duration: 2000,
    });
    toast("redirecting...", {
      duration: 2000,
    });
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  }

  function errorCallback(message: string) {
    toast.error(message, {
      duration: 4000,
    });
    toast("redirecting...", {
      duration: 4000,
    });
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  }

  return (
    <PayPalScriptProvider options={{ clientId }}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          label: "buynow",
          shape: "rect",
          color: "gold",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: price,
                  currency_code: "USD",
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          console.log(data);
          const id = data.orderID;
          const res = await confirm({
            variables: { confirmOrderId: id, productId },
          });

          const { message, success } = res.data.confirmOrder;
          if (success) {
            successCallback();
          } else {
            errorCallback(message);
          }
        }}
      />
    </PayPalScriptProvider>
  );
}
