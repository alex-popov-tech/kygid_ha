import { faker } from '@faker-js/faker';
import { test } from './base';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ app: { login } }) => {
  await login.navigate();
});

test('should show Toast error on invalid credentials', async ({ app: { login } }) => {
  await login.set({ email: 'invalid', password: 'invalid' });
  await login.submit();
  await login.toasts.shouldBe("Wrong credentials or user doesn't exist");
});

test.describe(() => {
  const data = {
    type: 'TCPN' as const,
    name: faker.company.name(),
    description: faker.lorem.words(),
    number: faker.string.uuid(),
    revision: '1.0.0',
  };

  test.beforeEach(async ({ app: { login } }) => {
    await login.set({ email: 'anastasia+sandbox@kyg.ai', password: 'Test12345!' });
    await login.submit();
  });

  test('should not create product with empty "Revision"', async ({ pause, app: { editProduct, products } }) => {
    await products.addItem(data.type);

    await editProduct.productNewAttributes.set({ ...data, revision: '' });
    await editProduct.create();
    await products.shouldBeOpened();
  });

  test('should create product', async ({ pause, app: { editProduct, products } }) => {
    await products.addItem(data.type);

    await editProduct.productNewAttributes.set(data);
    await editProduct.create();

    await products.navigate();
    await products.table.body.byNumber(data.number).open();
    await products.attributes.shouldBe(data);
  });
});
