import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,Cell,
} from "recharts";

const InfoPage = () => {
  const [cod, setCod] = useState("");
  const [online, setOnline] = useState("");
  const [data, setData] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setCod(data.cod);
      setOnline(data.online);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const paymentData = [
    { method: "online", users: online, fill: "#03bafc" },
    { method: "cod", users: cod, fill: "#8c1251" },
  ];

  const paymentChartConfig = {
    users: {
      label: "Users",
    },
    online: {
      label: "Online",
      color: "hls(var(--chart1))",
    },
    cod: {
      label: "COD",
      color: "hls(var(--chart2))",
    },
  };

  const paymentPercentage = paymentData.map((data) => ({
    ...data,
    percentage: parseFloat(((data.users / (cod + online)) * 100).toFixed(2)),
  }));
return (
  <div className="min-h-screen bg-[#f4f1ea] px-6 md:px-10 py-12">

    {/* Heading */}
    <div className="mb-14">

      <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
        Analytics Dashboard
      </p>

      <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
        Store Insights
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
        Monitor payment methods, sales distribution and product
        performance across your store.
      </p>

    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

      {/* Payment Methods */}
      <div className="border border-[#d9c8a8] bg-white p-8 shadow-sm">

        <div className="mb-10">

          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#705023]">
            Payment Analytics
          </p>

          <h2 className="font-garamond text-5xl text-[#1d1d1d]">
            Payment Methods
          </h2>

        </div>

        <div className="flex justify-center">

          <PieChart width={350} height={350}>

            <Pie
              data={paymentData}
              dataKey={"users"}
              nameKey={"method"}
              innerRadius={85}
              outerRadius={120}
              paddingAngle={4}
            >

              {paymentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.method === "online"
                      ? "#BEA163"
                      : "#1d1d1d"
                  }
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox
                  ) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-[#1d1d1d] text-3xl font-bold"
                        >
                          {cod + online}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 28}
                          className="fill-gray-500 text-sm uppercase tracking-[3px]"
                        >
                          Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />

            </Pie>

            <Tooltip />

          </PieChart>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex justify-center gap-8">

          <div className="flex items-center gap-3">

            <div className="h-4 w-4 bg-[#BEA163]" />

            <p className="text-sm uppercase tracking-[3px] text-gray-600">
              Online
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="h-4 w-4 bg-[#1d1d1d]" />

            <p className="text-sm uppercase tracking-[3px] text-gray-600">
              COD
            </p>

          </div>

        </div>

      </div>

      {/* Percentage */}
      <div className="border border-[#d9c8a8] bg-white p-8 shadow-sm">

        <div className="mb-10">

          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#705023]">
            Distribution
          </p>

          <h2 className="font-garamond text-5xl text-[#1d1d1d]">
            Payment Percentage
          </h2>

        </div>

        <div className="flex justify-center">

          <PieChart width={350} height={350}>

            <Pie
              data={paymentPercentage}
              dataKey={"percentage"}
              nameKey={"method"}
              innerRadius={85}
              outerRadius={120}
              paddingAngle={4}
            >

              {paymentPercentage.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.method === "online"
                      ? "#BEA163"
                      : "#1d1d1d"
                  }
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox
                  ) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-[#1d1d1d] text-3xl font-bold"
                        >
                          100%
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 28}
                          className="fill-gray-500 text-sm uppercase tracking-[3px]"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />

            </Pie>

            <Tooltip />

          </PieChart>

        </div>

        {/* Bottom */}
        <div className="mt-10 grid grid-cols-2 gap-5">

          {paymentPercentage.map((e) => (
            <div
              key={e.method}
              className="border border-[#d9c8a8] bg-[#f8f3ea] p-5"
            >

              <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                {e.method}
              </p>

              <h3 className="mt-3 font-garamond text-5xl text-[#1d1d1d]">
                {e.percentage}%
              </h3>

            </div>
          ))}

        </div>

      </div>

      {/* Bar Chart */}
      <div className="xl:col-span-2 border border-[#d9c8a8] bg-white p-8 shadow-sm">

        <div className="mb-10">

          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#705023]">
            Product Analytics
          </p>

          <h2 className="font-garamond text-5xl text-[#1d1d1d]">
            Products Sold
          </h2>

        </div>

        <div className="overflow-x-auto">

          <BarChart
            width={1000}
            height={450}
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e7dcc6"
            />

            <XAxis
              dataKey={"name"}
              tick={{ fill: "#705023", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#705023", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #d9c8a8",
                color: "#1d1d1d",
              }}
            />

            <Bar
              dataKey={"sold"}
              fill="#BEA163"
              radius={[0, 0, 0, 0]}
            />

          </BarChart>

        </div>

      </div>

    </div>

  </div>
);
};

export default InfoPage;