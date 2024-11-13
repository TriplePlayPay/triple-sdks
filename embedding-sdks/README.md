# Embedding SDKs

A common need is to whitelabel payment solutions.
Therefore, forms and pages from https://tripleplaypay.com
are embeddable in iframes.

This section of the `triple-sdks` repository contains libraries to assist with this.

## Subresource Integrity

Due to a [requirement][pci-sri] to include [integrity][integrity] checks on resources,
these libraries will now be published to [NPM](https://npmjs.org/),
so that they can be imported into your website's javascript,
instead of the previous-generation distribution options such as `<script>` tags.

[pci-sri]: https://pcicompliancehub.com/pci-6-4-3-how-to-achieve-compliance/
[integrity]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity

The scripts found in this folder should remain reasonably minimal
so that they can be included into your projects without changing/using build tools.

Demos of script usage will still be built using build tools,
because using build tools allows for creation of the highest fidelity developer tools.
