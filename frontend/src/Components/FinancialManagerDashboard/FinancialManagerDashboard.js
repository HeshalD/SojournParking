import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import axios from "axios";

export default function FinanceDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profitLossData, setProfitLossData] = useState([]);
  const [userDistribution, setUserDistribution] = useState([]);
  const [hourlyRevenue, setHourlyRevenue] = useState([]);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/finance");
      setTransactions(res.data.transactions);
      setRevenueData(res.data.revenueChart);
      setTotalRevenue(res.data.totalRevenue);
      setTotalExpenses(res.data.totalExpenses);
      setProfitLossData(res.data.profitLossChart);
      setUserDistribution(res.data.userDistribution);
      setHourlyRevenue(res.data.hourlyRevenue);
    } catch (error) {
      console.error("Error fetching finance data", error);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold">Revenue & Expenses</h2>
          <p className="text-green-600">Total Revenue: ${totalRevenue}</p>
          <p className="text-red-600">Total Expenses: ${totalExpenses}</p>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4CAF50" />
              <Bar dataKey="expenses" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold">Profit & Loss Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitLossData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#4CAF50" />
              <Line type="monotone" dataKey="loss" stroke="#F44336" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold">User Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={userDistribution} dataKey="value" nameKey="category" outerRadius={100}>
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold">Hourly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyRevenue}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-3">
        <CardContent>
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn, index) => (
                <TableRow key={index}>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell className={txn.type === "Expense" ? "text-red-500" : "text-green-500"}>
                    ${txn.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-semibold">Actions</h2>
          <Button className="w-full mt-2">Export Report</Button>
          <Button className="w-full mt-2" variant="secondary">View Full Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}
