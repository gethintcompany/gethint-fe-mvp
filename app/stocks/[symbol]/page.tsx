"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowLeft, TrendingDown, Calendar, ExternalLink } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for the stock analysis
const stockData = {
  RELIANCE: {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    logo: "/placeholder.svg?height=60&width=60",
    price: 2456.75,
    change: 23.45,
    changePercent: 0.96,
    ytdPerformance: 12.5,
    marketCap: "₹16.6L Cr",
    volume: "2.3M",
    aiScore: 8.2,
    fundamentalScore: 8.5,
    sentimentScore: 7.8,
    technicalScore: 8.3,
    riskLevel: "Medium",
    priceData6M: [
      { date: "Jul", price: 2200 },
      { date: "Aug", price: 2280 },
      { date: "Sep", price: 2150 },
      { date: "Oct", price: 2320 },
      { date: "Nov", price: 2380 },
      { date: "Dec", price: 2456 },
    ],
    priceData1Y: [
      { date: "Jan", price: 2100 },
      { date: "Feb", price: 2180 },
      { date: "Mar", price: 2050 },
      { date: "Apr", price: 2200 },
      { date: "May", price: 2150 },
      { date: "Jun", price: 2220 },
      { date: "Jul", price: 2200 },
      { date: "Aug", price: 2280 },
      { date: "Sep", price: 2150 },
      { date: "Oct", price: 2320 },
      { date: "Nov", price: 2380 },
      { date: "Dec", price: 2456 },
    ],
    news: [
      {
        title: "Reliance Industries reports strong Q3 earnings",
        summary:
          "The company posted a 15% increase in net profit driven by strong performance in retail and digital segments.",
        date: "2024-01-15",
        sentiment: "positive",
        source: "Economic Times",
      },
      {
        title: "RIL announces major expansion in renewable energy",
        summary: "Reliance plans to invest ₹75,000 crores in green energy projects over the next 3 years.",
        date: "2024-01-12",
        sentiment: "positive",
        source: "Business Standard",
      },
      {
        title: "Oil refining margins under pressure",
        summary: "Global refining margins have declined, potentially impacting RIL's petrochemical business.",
        date: "2024-01-10",
        sentiment: "negative",
        source: "Mint",
      },
    ],
  },
}

interface PageProps {
  params: {
    symbol: string
  }
}

export default function StockAnalysisPage({ params }: PageProps) {
  const [chartPeriod, setChartPeriod] = useState<"6M" | "1Y">("6M")

  // In a real app, you'd fetch this data based on the symbol
  const stock = stockData.RELIANCE // Default to RELIANCE for demo

  if (!stock) {
    return <div>Stock not found</div>
  }

  const getScoreColor = (score: number) => {
    if (score >= 7) return "bg-green-50 text-green-700 border-green-200"
    if (score >= 4) return "bg-yellow-50 text-yellow-700 border-yellow-200"
    return "bg-red-50 text-red-700 border-red-200"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 7) return "Strong Buy"
    if (score >= 4) return "Hold"
    return "Strong Sell"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-50 text-green-700 border-green-200"
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "High":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50"
      case "negative":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const currentPriceData = chartPeriod === "6M" ? stock.priceData6M : stock.priceData1Y

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <TrendingUp className="h-7 w-7 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">GetHints</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/stocks" className="text-gray-600 hover:text-gray-900 transition-colors">
                Stocks
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/stocks">
          <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stocks
          </Button>
        </Link>

        {/* Stock Header */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-700">{stock.symbol.substring(0, 2)}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{stock.symbol}</h1>
                  <p className="text-gray-600">{stock.name}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>Market Cap: {stock.marketCap}</span>
                    <span>Volume: {stock.volume}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</div>
                <div
                  className={`flex items-center justify-end ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  YTD:{" "}
                  <span className={stock.ytdPerformance >= 0 ? "text-green-600" : "text-red-600"}>
                    {stock.ytdPerformance >= 0 ? "+" : ""}
                    {stock.ytdPerformance.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card className={`border-2 ${getScoreColor(stock.aiScore)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall AI Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stock.aiScore.toFixed(1)}</div>
              <p className="text-xs mt-1">{getScoreLabel(stock.aiScore)}</p>
            </CardContent>
          </Card>

          <Card className={`border-2 ${getScoreColor(stock.fundamentalScore)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Fundamental</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stock.fundamentalScore.toFixed(1)}</div>
              <p className="text-xs mt-1">Financial Health</p>
            </CardContent>
          </Card>

          <Card className={`border-2 ${getScoreColor(stock.sentimentScore)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stock.sentimentScore.toFixed(1)}</div>
              <p className="text-xs mt-1">Market Sentiment</p>
            </CardContent>
          </Card>

          <Card className={`border-2 ${getScoreColor(stock.technicalScore)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Technical</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stock.technicalScore.toFixed(1)}</div>
              <p className="text-xs mt-1">Price Trends</p>
            </CardContent>
          </Card>

          <Card className={`border-2 ${getRiskColor(stock.riskLevel)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`border ${getRiskColor(stock.riskLevel)}`}>{stock.riskLevel}</Badge>
              <p className="text-xs mt-2">Investment Risk</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Chart */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Price Trend</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={chartPeriod === "6M" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartPeriod("6M")}
                      className={chartPeriod === "6M" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      6M
                    </Button>
                    <Button
                      variant={chartPeriod === "1Y" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartPeriod("1Y")}
                      className={chartPeriod === "1Y" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      1Y
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentPriceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        formatter={(value) => [`₹${value}`, "Price"]}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent News */}
          <div>
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stock.news.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900 leading-tight pr-2">{item.title}</h4>
                      <Badge className={`text-xs ${getSentimentColor(item.sentiment)} border-0`}>
                        {item.sentiment}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">{item.summary}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">{item.source}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
