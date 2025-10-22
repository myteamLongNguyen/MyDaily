declare global {
  interface String {
    capitalize(): string;
    capitalizeWords(): string;
  }
}

String.prototype.capitalize = function (): string {
  if (!this) return "";
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalizeWords = function (): string {
  if (!this) return "";
  return this.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export {};
