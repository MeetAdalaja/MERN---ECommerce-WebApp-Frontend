import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { Skeleton } from "../../../components/loader";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { getLastMonths } from "../../../utils/features";

const { last12Months: months } = getLastMonths()

const Linecharts = () => {



  const { user } = useSelector((state: RootState) => state.userReducer)

  const { data, isLoading, isError, error } = useLineQuery(user?._id!)

  const products = data?.charts.products || [];
  const users = data?.charts.users || [];
  const revenue = data?.charts.revenue || [];
  const discount = data?.charts.discount || [];


  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }





  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {
          isLoading ? <Skeleton count={12} /> : (
            <>
              <section>
                <LineChart
                  // data={users}
                  data={[4, 2, 2, 1, 1, 5, 1, 2, 4, 6, 4, 8]}
                  label="Users"
                  borderColor="rgb(53, 162, 255)"
                  labels={months}
                  backgroundColor="rgba(53, 162, 255, 0.5)"
                />
                <h2>Active Users</h2>
              </section>

              <section>
                <LineChart
                  // data={products}
                  data={[10, 11, 11, 22, 11, 16, 12, 23, 43, 23, 53, 11]}
                  backgroundColor={"hsla(269,80%,40%,0.4)"}
                  borderColor={"hsl(269,80%,40%)"}
                  labels={months}
                  label="Products"
                />
                <h2>Total Products (SKU)</h2>
              </section>

              <section>
                <LineChart
                  // data={revenue}
                  data={[232234, 300334, 175352, 232411, 321211, 234121, 328902, 257977, 158452, 479763, 267393, 326323]}
                  backgroundColor={"hsla(129,80%,40%,0.4)"}
                  borderColor={"hsl(129,80%,40%)"}
                  label="Revenue"
                  labels={months}
                />
                <h2>Total Revenue </h2>
              </section>

              <section>
                <LineChart
                  // data={discount}
                  data={[600, 500, 1000, 4999, 3322, 6433, 7213, 8000, 4322, 6000, 9000, 10200,]}
                  backgroundColor={"hsla(29,80%,40%,0.4)"}
                  borderColor={"hsl(29,80%,40%)"}
                  label="Discount"
                  labels={months}
                />
                <h2>Discount Allotted </h2>
              </section>
            </>
          )
        }
      </main>
    </div>
  );
};

export default Linecharts;
