"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Search, ArrowUpDown, Filter } from "lucide-react"

// Mock stock data
const stocksData = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 8.2,
    fundamentalScore: 8.5,
    sentimentScore: 7.8,
    technicalScore: 8.3,
    riskLevel: "Medium",
    ytdPerformance: 12.5,
    price: "₹2,456.75",
    marketCap: "₹16.6L Cr",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 9.1,
    fundamentalScore: 9.2,
    sentimentScore: 8.9,
    technicalScore: 9.0,
    riskLevel: "Low",
    ytdPerformance: 18.3,
    price: "₹3,890.20",
    marketCap: "₹14.1L Cr",
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 8.7,
    fundamentalScore: 8.8,
    sentimentScore: 8.5,
    technicalScore: 8.8,
    riskLevel: "Low",
    ytdPerformance: 15.2,
    price: "₹1,654.30",
    marketCap: "₹6.9L Cr",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Limited",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 7.9,
    fundamentalScore: 8.1,
    sentimentScore: 7.6,
    technicalScore: 8.0,
    riskLevel: "Low",
    ytdPerformance: 8.7,
    price: "₹1,789.45",
    marketCap: "₹13.2L Cr",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 7.5,
    fundamentalScore: 7.8,
    sentimentScore: 7.2,
    technicalScore: 7.5,
    riskLevel: "Medium",
    ytdPerformance: 6.3,
    price: "₹1,234.80",
    marketCap: "₹8.7L Cr",
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 6.8,
    fundamentalScore: 7.2,
    sentimentScore: 6.5,
    technicalScore: 6.7,
    riskLevel: "Low",
    ytdPerformance: 4.1,
    price: "₹2,567.90",
    marketCap: "₹6.0L Cr",
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 5.9,
    fundamentalScore: 6.2,
    sentimentScore: 5.5,
    technicalScore: 6.0,
    riskLevel: "Medium",
    ytdPerformance: -2.3,
    price: "₹456.25",
    marketCap: "₹5.7L Cr",
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Limited",
    logo: "/placeholder.svg?height=40&width=40",
    aiScore: 7.3,
    fundamentalScore: 7.5,
    sentimentScore: 7.0,
    technicalScore: 7.4,
    riskLevel: "Medium",
    ytdPerformance: 9.8,
    price: "₹987.60",
    marketCap: "₹5.4L Cr",
  },
]

type SortField =
  | "symbol"
  | "name"
  | "aiScore"
  | "fundamentalScore"
  | "sentimentScore"
  | "technicalScore"
  | "riskLevel"
  | "ytdPerformance"

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("aiScore")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const filteredAndSortedStocks = useMemo(() => {
    const filtered = stocksData.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
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
              <Link href="/stocks" className="text-gray-900 font-medium">
                Stocks
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Analysis</h1>
          <p className="text-gray-600">Discover AI-powered insights for Indian stocks</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by stock name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="h-12 px-6 border-gray-300 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Score Legend */}
        <Card className="mb-8 border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">AI Score Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">7+</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Strong Buy</h4>
                  <p className="text-sm text-green-700">High confidence recommendation</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">4-6</span>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">Hold</h4>
                  <p className="text-sm text-yellow-700">Neutral recommendation</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">0-3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">Strong Sell</h4>
                  <p className="text-sm text-red-700">Low confidence recommendation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock Table */}
        <Card className="border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Stock</th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("aiScore")}
                    >
                      <div className="flex items-center gap-1">
                        AI Score
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("fundamentalScore")}
                    >
                      <div className="flex items-center gap-1">
                        Fundamental
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("sentimentScore")}
                    >
                      <div className="flex items-center gap-1">
                        Sentiment
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("technicalScore")}
                    >
                      <div className="flex items-center gap-1">
                        Technical
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("riskLevel")}
                    >
                      <div className="flex items-center gap-1">
                        Risk Level
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("ytdPerformance")}
                    >
                      <div className="flex items-center gap-1">
                        YTD Performance
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedStocks.map((stock) => (
                    <tr
                      key={stock.symbol}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => (window.location.href = `/stocks/${stock.symbol}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-sm font-medium text-blue-700">{stock.symbol.substring(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                            <div className="text-sm text-gray-500">{stock.name}</div>
                            <div className="text-xs text-gray-400">{stock.price}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Badge className={`border ${getScoreColor(stock.aiScore)}`}>{stock.aiScore.toFixed(1)}</Badge>
                          <span className="text-xs text-gray-500">{getScoreLabel(stock.aiScore)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`border ${getScoreColor(stock.fundamentalScore)}`}>
                          {stock.fundamentalScore.toFixed(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`border ${getScoreColor(stock.sentimentScore)}`}>
                          {stock.sentimentScore.toFixed(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`border ${getScoreColor(stock.technicalScore)}`}>
                          {stock.technicalScore.toFixed(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`border ${getRiskColor(stock.riskLevel)}`}>{stock.riskLevel}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${stock.ytdPerformance >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {stock.ytdPerformance >= 0 ? "+" : ""}
                          {stock.ytdPerformance.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
