
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Product component", () => {
  let product;
  let loadCart;
  let user;

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();

    axios.post.mockResolvedValue({ data: {} });

    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceRupes: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    loadCart = vi.fn().mockResolvedValue(undefined);
    user = userEvent.setup();
  });

  it("displays the product details correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByAltText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
  });

  it("adds the product to the cart and calls loadCart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    await user.click(screen.getByTestId("add-to-cart-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
        productId: product.id,
        quantity: 1,
      });

      expect(loadCart).toHaveBeenCalledTimes(1);
    });
  });

  it("allows the user to select a quantity", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const quantitySelector = screen.getByTestId(
      "product-quantity-selector",
    );

    expect(quantitySelector).toHaveValue("1");

    await user.selectOptions(quantitySelector, "3");

    expect(quantitySelector).toHaveValue("3");
  });

  it("adds the selected quantity to the cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const quantitySelector = screen.getByTestId(
      "product-quantity-selector",
    );

    await user.selectOptions(quantitySelector, "3");
    await user.click(screen.getByTestId("add-to-cart-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
        productId: product.id,
        quantity: 3,
      });

      expect(loadCart).toHaveBeenCalledTimes(1);
    });
  });

  it("shows the Added message after successfully adding a product", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    await user.click(screen.getByTestId("add-to-cart-button"));

    expect(await screen.findByText("Added")).toBeInTheDocument();
  });

  it("does not call loadCart if adding the product fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Request failed"));

    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<Product product={product} loadCart={loadCart} />);

    await user.click(screen.getByTestId("add-to-cart-button"));

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    expect(loadCart).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
