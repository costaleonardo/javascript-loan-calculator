// --- Variables
// ---------------------

var form = document.getElementById('form'),
    amount = document.getElementById('amount'),
    interest = document.getElementById('interest'),
    years = document.getElementById('years'),
    monthlyPayment = document.getElementById('monthly-payment'),
    totalPayment = document.getElementById('total-payment'),
    totalInterest = document.getElementById('total-interest'),
    results = document.getElementById('results'),
    loading = document.getElementById('loading');

// --- Functions
// ---------------------

// Calculate results from form
function calculateResults () {
  // Prevent default behaviour


  var principal = parseFloat(amount.value),
      calculatedInterest = parseFloat(interest.value) / 100 / 12,
      calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  var x = Math.pow(1 + calculatedInterest, calculatedPayments),
      monthly = (principal * x * calculatedInterest) / (x-1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    results.style.display = 'block';

    // Hide loader
    loading.style.display = 'none';
  } else {
    // Show error to UI
    showError('Please check your numbers');
  }

}

// Show error according to error
function showError () {
  // Hide results
  results.style.display = 'none';

  // Show loader
  loading.style.display = 'none';

  // Create new <div>
  var errorDiv = document.createElement('div');

  // Get elementx
  var container = document.querySelector('.container'),
      title = document.querySelector('.container__title');

  // Add class to new <div>
  errorDiv.className = 'alert alert--danger';

  // Create text node and append to <div>
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error between .container and .container__title
  container.insertBefore(errorDiv, title);

  // Clear error after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// --- Events
// ---------------------

// On submit
form.addEventListener('submit', function(e) {
  e.preventDefault();

  results.style.display = 'none';

  loading.style.display = 'block';

  // Calculate on submit
  setTimeout(calculateResults, 2000);
});
