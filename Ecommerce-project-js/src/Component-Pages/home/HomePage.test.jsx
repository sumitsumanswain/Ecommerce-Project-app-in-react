import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { HomePage } from "./HomePage";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("HomePage component", () => {
  let loadCart;
  let user;

  const products = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: { stars: 4.5, count: 87 },
      priceRupes: 1090,
      keywords: ["socks", "sports", "apparel"],
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: { stars: 4, count: 127 },
      priceRupes: 2095,
      keywords: ["sports", "basketballs"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    loadCart = vi.fn().mockResolvedValue(undefined);
    user = userEvent.setup();

    axios.get.mockImplementation(async (urlPath) => {
      if (
        urlPath === "/api/products" ||
        urlPath.startsWith("/api/products?search=")
      ) {
        return { data: products };
      }

      throw new Error(`Unexpected URL: ${urlPath}`);
    });

    axios.post.mockResolvedValue({ data: { success: true } });
  });

  it("displays the products correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers).toHaveLength(2);

    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();

    expect(
      within(productContainers[0]).getByAltText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
  });

  it("adds products to the cart with the selected quantities", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    const firstProduct = within(productContainers[0]);

    await user.selectOptions(
      firstProduct.getByTestId("product-quantity-selector"),
      "2",
    );

    await user.click(firstProduct.getByTestId("add-to-cart-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
      });

      expect(loadCart).toHaveBeenCalledTimes(1);
    });

    const secondProduct = within(productContainers[1]);

    await user.selectOptions(
      secondProduct.getByTestId("product-quantity-selector"),
      "3",
    );

    await user.click(secondProduct.getByTestId("add-to-cart-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
      });

      expect(loadCart).toHaveBeenCalledTimes(2);
    });
  });
});
