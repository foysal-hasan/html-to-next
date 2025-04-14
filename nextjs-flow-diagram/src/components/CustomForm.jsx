"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";

export default function CustomForm() {
  const [searchType, setSearchType] = useState("Username");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const isValidDomain = (domain) => {
    const domainRegex =
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const handleSearch = () => {
    if (searchType === "Domain") {
      if (!searchValue.trim()) {
        alert("Please enter a domain");
        return;
      }

      if (!isValidDomain(searchValue)) {
        alert("Please enter a valid domain. Example: google.com");
        return;
      }
      router.push(`/hackerreport?domain=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      className="max-w-[100%]"
    >
      <Row>
        <Col span={24}>
          <div className="w-[100%] relative">
            <div className="flex items-center p-1 rounded-sm space-x-2 absolute top-[2px] z-10">
              <select
                className="bg-gray-600 text-gray-300 text-sm rounded-md focus:outline-none focus:ring-1 cursor-pointer"
                defaultValue="Username"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option>Username</option>
                <option>Phone</option>
                <option>Image</option>
                <option>IP</option>
                <option>Full Name</option>
                <option>Email</option>
                <option>Social Media</option>
                <option>Profile</option>
                <option>Keyword</option>
                <option>Address</option>
                <option>Domain</option>
              </select>
            </div>
            <Form.Item
              name="username"
              className="w-[100%]"
              // rules={[{ required: true, message: "Please input your Username!" }]}
            >
              <Input
                prefix={<SearchOutlined />}
                placeholder="Filter by keywords..."
                className="bg-gray-700 graph_filter_input"
                style={{
                  background: "rgb(55 65 81)",
                  color: "gray",
                  paddingLeft: "91px",
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </Form.Item>
            <div className="text-center">
              <SearchOutlined
                className="text-center flex items-center justify-center mt-5 text-white bg-orange-400 p-2 rounded-[50%] cursor-pointer"
                onClick={handleSearch}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
