import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it("displays the product details correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByAltText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
  });

  it("adds the product to cart and calls loadCart", async () => {
    

    render(<Product product={product} loadCart={loadCart} />);

    const addToCartButtons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addToCartButtons[0]);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalledTimes(1);
    it('select a quantity',async()=>{
      render(<Product product={product} loadCart={loadCart}/>)
      const quantitySilector = screen.getByTestId('product-quantity-selector')
      expect(quantitySilector).toHavevalue('1');

       
      await user.selectOptions(quantitySilector,'3')
      expect(quantitySilector).toHavevalue('3');
      

      const addToCartButtons = screen.getAllByTestId('add-to-button');
      await user.click(addToCartButtons);

      expect(axios.post).toHaveBeenCalledWith(
        '/api/cart-items',
        {
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 3
        }
      );
      expect(loadCart).toHaveBeenCalled();
    })
  });
});